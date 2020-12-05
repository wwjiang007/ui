import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  router: service(),

  init() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this.handleReroute);
  },

  build: computed('model.executions.@each.run', 'model.pipeline.id', 'model.run', function() {
    return get(this, 'model.executions').find((exe) => get(exe, 'pipelineId') === get(this, 'model.pipeline.id') && get(exe, 'run') === parseInt(get(this, 'model.run'), 10));
  }),

  handleReroute() {
    if ( !get(this, 'build') ) {
      get(this, 'router').transitionTo('authenticated.project.pipeline.pipelines');
    }
  },

});
