/**
 * Created by Junwei on 16/4/5.
 */
import {Inject} from  'meteor/meteorhacks:inject-initial';
//在meteor加载时载入插件js
Inject.rawHead('UnicallPlugin','<script type="text/javascript" src="//static.yunkefu.com/jslib/unicall-plugin/v2/unicall.plugin.js"></script>');