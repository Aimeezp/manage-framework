import './adapter/common';
import './adapter/OtherMaintain';
import './adapter/testMaintain';
import './adapter/statisBoard';

import mock from './adapter/adapter';

mock.onAny().passThrough();
