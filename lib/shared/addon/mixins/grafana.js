import Mixin from '@ember/object/mixin';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Mixin.create({
  globalStore: service(),
  scope:       service(),
  grafana:      service(),

  grafanaUrl: computed('baseType', 'grafana.dashboards', 'grafanaDashboardName', 'grafanaResourceId', 'namespaceId', 'podName', 'scope.currentCluster.monitoringStatus.grafanaEndpoint', 'scope.currentProject.isMonitoringReady', 'scope.currentProject.monitoringStatus.grafanaEndpoint', 'type', function() {
    let dashboardName = get(this, 'baseType') === 'workload' ? (get(this, 'type') || '').capitalize() : get(this, 'grafanaDashboardName');

    const dashboard = (get(this, 'grafana.dashboards') || []).findBy('title', dashboardName);

    if (!dashboard) {
      return;
    }

    const found = get(this, 'globalStore').all('project').findBy('isSystemProject', true);
    const isProjectReady = get(this, 'scope.currentProject.isMonitoringReady');
    let grafanaUrl;

    if ( isProjectReady ) {
      grafanaUrl = `${ get(this, 'scope.currentProject.monitoringStatus.grafanaEndpoint') }${ dashboard.url }`;
    } else if ( found ) {
      grafanaUrl = `${ get(this, 'scope.currentCluster.monitoringStatus.grafanaEndpoint') }${ dashboard.url }`;
    }

    switch (get(this, 'type')) {
    case 'node':
      grafanaUrl += `?var-node=${ get(this, 'grafanaResourceId') }:9796`;
      break;
    case 'deployment':
      grafanaUrl += `?var-deployment_namespace=${ get(this, 'namespaceId') }&var-deployment_name=${ get(this, 'grafanaResourceId') }`;
      break;
    case 'daemonSet':
      grafanaUrl += `?var-daemonset_namespace=${ get(this, 'namespaceId') }&var-daemonset_name=${ get(this, 'grafanaResourceId') }`;
      break;
    case 'statefulSet':
      grafanaUrl += `?var-statefulset_namespace=${ get(this, 'namespaceId') }&var-statefulset_name=${ get(this, 'grafanaResourceId') }`;
      break;
    case 'pod':
      grafanaUrl += `?var-namespace=${ get(this, 'namespaceId') }&var-pod=${ get(this, 'grafanaResourceId') }&var-container=All`;
      break;
    case 'container':
      grafanaUrl += `?var-namespace=${ get(this, 'namespaceId') }&var-pod=${ get(this, 'podName') }&var-container=${ get(this, 'grafanaResourceId') }`;
      break;
    }

    return grafanaUrl;
  }),
});
