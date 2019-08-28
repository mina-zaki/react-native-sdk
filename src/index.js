import { Buffer } from 'buffer'
import ReactNativeSdk from './index-react-native';
import BrowserSdk from './index-web';
import User from './modules/user';
import Tenant from './modules/tenant';
import Client from './modules/client';
import Device from './modules/device';
import Timeseries from './modules/timeseries';
import Event from './modules/event';
import Certificate from './modules/certificate';
import DeviceType from './modules/deviceType';
import Consumption from './modules/consumption';

global.Buffer = global.Buffer || Buffer;

export { User, Tenant, Client, Device, DeviceType, Timeseries, Event, Certificate, Consumption };
export {ReactNativeSdk, BrowserSdk};
