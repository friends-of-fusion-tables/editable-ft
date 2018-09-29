/* 
 * Copyright 2018 Anno Langen.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {PageSpec, parseToCurrentPageSpec, whereClauses} from "./pageSpec";
import {
    LOADING, LOGIN, setCurrentViewModelToTable, setCurrentViewModelToListing
} from "./viewModel";
import {drawPage, redrawPage} from "./pageView";
import Sqlresponse = gapi.client.fusiontables.Sqlresponse;

gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1',
      'https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest'],
    clientId: 'YOUR_CLIENT_ID',
    scope: 'profile https://www.googleapis.com/auth/fusiontables https://www.googleapis.com/auth/fusiontables.readonly'
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(signInHandler);
    signInHandler(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
});

const signInHandler = (isSignedIn:boolean) => isSignedIn ? route(location.hash) : drawPage(LOGIN);

window.addEventListener('hashchange', () => route(location.hash));

function route(hash:string) {
  drawPage(viewModel(parseToCurrentPageSpec(hash)));
}

/**
 * Returns an initial ViewModel for the given PageSpec. Loads table, rows, and row IDs concurrently
 * and returns an interstitial ViewModel. Loads listing of owned tables by default.
 */
function viewModel(spec:PageSpec) {
  const {tableId, limit, orderBy, addFilter} = spec;
  if (tableId) {
    const clauses = whereClauses(spec.filter);
    const where = clauses.length ? ' where ' + clauses.join(' and ') : '';
    const ordering = orderBy ? ' order by ' + orderBy : '';
    loadTable(tableId, `from ${tableId}${where}${ordering} limit ${limit || 30}`);
    return LOADING;

    async function loadTable(tableId:string, querySuffix:string) {
      // Three or four concurrent requests
      const [table, rowResult, rowIdResult, filterValues] = await Promise.all(
          [gapi.client.fusiontables.table.get({tableId}), query('select * ' + querySuffix),
            query('select ROWID ' + querySuffix), queryFilterValues()]);
      drawPage(
          setCurrentViewModelToTable(table.result, rowResult.result, rowIdResult.result, addFilter,
              addFilter ? filterValues.result : undefined));

      function query(sql:string) {
        return gapi.client.fusiontables.query.sql({sql});
      }

      function queryFilterValues() {
        return addFilter ? query(
            `select '${addFilter}', count() from ${tableId}${where} group by '${addFilter}'`)
            : {} as gapi.client.Request<Sqlresponse>;
      }
    }
  }
  loadTableListing();
  return LOADING;

  async function loadTableListing() {
    const sql = "show tables";
    const sqlResponse = await gapi.client.fusiontables.query.sql({sql});
    drawPage(setCurrentViewModelToListing(sql, sqlResponse.result));
  }
}

redrawPage();
