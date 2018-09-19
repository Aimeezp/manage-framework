import './adapter/common';
import './adapter/OtherMaintain';

import mock from './adapter/adapter';

mock.onAny().passThrough();
