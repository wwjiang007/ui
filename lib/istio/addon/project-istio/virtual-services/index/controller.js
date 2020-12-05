import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  scope: service(),

  sortBy: 'name',

  headers: [
    {
      name:           'state',
      sort:           ['sortState', 'displayName'],
      searchField:    'displayState',
      translationKey: 'generic.state',
      width:          120
    },
    {
      name:           'name',
      searchField:    'displayName',
      translationKey: 'generic.name',
    },
    {
      name:           'hosts',
      searchField:    'hosts',
      translationKey: 'virtualServicePage.table.hosts.label',
      width:          200
    },
    {
      name:           'created',
      sort:           ['created', 'id'],
      classNames:     'text-right pr-20',
      searchField:    false,
      translationKey: 'generic.created',
    },
  ],

  rows: alias('model.data'),
});
