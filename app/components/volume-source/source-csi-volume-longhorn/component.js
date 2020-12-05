import { set } from '@ember/object';
import Component from '@ember/component';
import layout from './template';
import VolumeSource from 'shared/mixins/volume-source';
import C from 'ui/utils/constants';

export default Component.extend(VolumeSource, {
  layout,
  field: 'csi',

  init() {
    this._super(...arguments);

    const { config: { driver, volumeAttributes } } = this;

    if (!driver) {
      set(this, 'config.driver', C.STORAGE.LONGHORN_PROVISIONER_KEY);
    }

    if (!volumeAttributes) {
      set(this, 'config.volumeAttributes', {
        size:                '2Gi',
        numberOfReplicas:    '3',
        staleReplicaTimeout: '20',
        fromBackup:          ''
      });
    }
  }
});
