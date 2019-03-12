import './adapter/common';
import './adapter/OtherMaintain';
import './adapter/testMaintain';

import mock from './adapter/adapter';

mock.onAny().passThrough();
