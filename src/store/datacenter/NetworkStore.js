/**
 * Created by jiangrx on 2015/11/26.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var networkSource = require('../../resources/datacenter/NetworkResource');
var networkDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var networkConstants = require('../../constants/datacenter/NetworkConstants');

const ActionTypes = networkConstants.ActionTypes;
const GET_ALLVDC_SUCCESS = 'fetch_allVDC_sucess';
const GET_ALLVDC_FAIL = 'fetch_allVDC_fail';
const GET_ALL_NETWORK_PRIVATE_SUCCESS = 'fetch_network_private_success';
const GET_ALL_NETWORK_PRIVATE_FAIL = 'fetch_network_private_fail';
const GET_ALL_NETWORK_PRIVATE_IPS_SUCCESS = 'fetch_network_private_ips_success';
const GET_ALL_NETWORK_PRIVATE_IPS_FAIL = 'fetch_network_private_ips_fail';
const GET_ALL_NETWORK_EXTERNAL_SUCCESS = 'GET_ALL_NETWORK_EXTERNAL_SUCCESS';
const GET_ALL_NETWORK_EXTERNAL_FAIL = 'GET_ALL_NETWORK_EXTERNAL_FAIL';
const GET_ALL_NETWORK_EXTERNAL_IPS_SUCCESS = 'GET_ALL_NETWORK_EXTERNAL_IPS_SUCCESS';
const GET_ALL_NETWORK_EXTERNAL_IPS_FAIL = 'GET_ALL_NETWORK_EXTERNAL_IPS_FAIL';
const GET_ALL_NETWORK_PUBLIC_SUCCESS = 'GET_ALL_NETWORK_PUBLIC_SUCCESS';
const GET_ALL_NETWORK_PUBLIC_FAIL = 'GET_ALL_NETWORK_PUBLIC_FAIL';
const GET_ALL_NETWORK_PUBLIC_IPS_SUCCESS = 'GET_ALL_NETWORK_PUBLIC_IPS_SUCCESS';
const GET_ALL_NETWORK_PUBLIC_IPS_FAIL = 'GET_ALL_NETWORK_PUBLIC_IPS_FAIL';
const UPDATE_DCID = 'update_dcid';
const UPDATE_VDCID = 'update_vdcid';
const UPDATE_NETINFO = 'update_netid';

let _vdcID = 0;
let _dcID = 0;
let _privateNetworks = [];
let _privateNetworkTotalSize = 0;
let _privateIPs = [];
let _privateIPsTotalSize = 0;
let _externalNetworks = [];
let _externalNetworksTotalSize = 0;
let _externalIPs = [];
let _externalIPsTotalSize = 0;
let _publicNetworks = [];
let _publicNetworksTotalSize = 0;
let _publicIPs = [];
let _publicIPsTotalSize = 0;
let _netInfo = {};

var networkStore = assign({}, EventEmitter.prototype, {


  fetchPrivateNetworks: function (payload) {
    networkSource.getAllVDCs(payload).then(vdcs => {
      if (vdcs.collection) {
        _privateNetworks = [];
        vdcs = vdcs.collection;
        if(vdcs.length === 0){
          _privateNetworks = [];
          this.emit(GET_ALL_NETWORK_PRIVATE_SUCCESS);
        }
        let ik = 0;
        for (let i = 0; i < vdcs.length; i++) {
          payload.vdcID = vdcs[i].id;
          networkSource.getPrivateNetworks(payload).then(nets => {
            if (nets.collection) {
              nets = nets.collection;
              if(nets.length === 0 ){
                _privateNetworks = [];
                this.emit(GET_ALL_NETWORK_PRIVATE_SUCCESS);
              }
              for (let k = 0; k < nets.length; k++) {
                let net = nets[k];
                net.key = vdcs[i].id + '+' + nets[k].id;
                net.vdcID = vdcs[i].id;
                net.netID = nets[k].id;
                net.row = [{data: vdcs[i].name}, {data: nets[k].name}];
                net.netInfo = nets[k];
                _privateNetworks.push(net);
              }
              ik++;
              if (ik === (vdcs.length)) {
                this.emit(GET_ALL_NETWORK_PRIVATE_SUCCESS);
              }
            } else {
              this.emit(GET_ALL_NETWORK_PRIVATE_FAIL);
            }
          });
        }
      } else {
        this.emit(GET_ALLVDC_FAIL);
      }
    });
  },
  fetchPrivateIPs: function (payload) {
    networkSource.getPrivateIPs(payload).then(ips => {
      if (ips.collection) {
        _privateIPs = [];
        _privateIPsTotalSize = ips.totalSize;
        ips = ips.collection;
        for (let i = 0; i < ips.length; i++) {
          let vApp = null;
          let vm = null;
          if (ips[i].links.length >= 4) {
            vApp = ips[i].links[3].title;
          }
          if (ips[i].links.length >= 5) {
            vm = ips[i].links[4].title;
          }
          let ip = ips[i];
          ip.key = ips[i].id;
          ip.row = [{data: ips[i].ip}, {data: ips[i].mac}, {data: ips[i].networkName}, {data: vApp}, {data: vm}];
          _privateIPs.push(ip);
        }
        this.emit(GET_ALL_NETWORK_PRIVATE_IPS_SUCCESS);
      } else {
        this.emit(GET_ALL_NETWORK_PRIVATE_IPS_FAIL);
      }
    });
  },

  fetchExternalNetworks: function (payload) {
    networkSource.fetchExternalNetworks(payload).then((results)=> {
      if (results.collection) {
        _externalNetworksTotalSize = results.totalSize;
        _externalNetworks = results.collection;
        this.emit(GET_ALL_NETWORK_EXTERNAL_SUCCESS);
      } else {
        this.emit(GET_ALL_NETWORK_EXTERNAL_FAIL);
      }
    }, ()=> {
      this.emit(GET_ALL_NETWORK_EXTERNAL_FAIL);
    });
  },
  fetchExternalIPs: function (payload) {
    networkSource.fetchExternalIPs(payload).then((results)=> {
      if (results.collection) {
        _externalIPs = results.collection;
        _externalIPsTotalSize = results.totalSize;
        this.emit(GET_ALL_NETWORK_EXTERNAL_IPS_SUCCESS);
      } else {
        this.emit(GET_ALL_NETWORK_EXTERNAL_IPS_FAIL);
      }
    }, ()=> {
      this.emit(GET_ALL_NETWORK_EXTERNAL_IPS_FAIL);
    });
  },
  fetchPublicNetworks: function (payload) {
    networkSource.fetchPublicNetworks(payload).then((results)=> {
      if (results.collection) {
        _publicNetworks = results.collection;
        _publicNetworksTotalSize = results.totalSize;
        this.emit(GET_ALL_NETWORK_PUBLIC_SUCCESS);
      } else {
        this.emit(GET_ALL_NETWORK_PUBLIC_FAIL);
      }
    }, ()=> {
      this.emit(GET_ALL_NETWORK_PUBLIC_FAIL);
    });
  },
  fetchPublicIPs: function (payload) {
    networkSource.fetchPublicIPs(payload).then((results)=> {
      if (results.collection) {
        _publicIPs = results.collection;
        _publicIPsTotalSize = results.totalSize;
        this.emit(GET_ALL_NETWORK_PUBLIC_IPS_SUCCESS);
      } else {
        this.emit(GET_ALL_NETWORK_PUBLIC_IPS_FAIL);
      }
    }, ()=> {
      this.emit(GET_ALL_NETWORK_PUBLIC_IPS_FAIL);
    });
  },
  getPrivateNetworks: function () {
    return _privateNetworks;
  },
  getPrivateNetworksTotalSize: function () {
    return _privateNetworkTotalSize;
  },
  getExternalNetworks: function () {
    return _externalNetworks;
  },
  getExternalNetworksTotalSize: function () {
    return _externalNetworksTotalSize;
  },
  getExternalIPs: function () {
    return _externalIPs;
  },
  getExternalIPsTotalSize: function () {
    return _externalIPsTotalSize;
  },
  getPublicNetworks: function () {
    return _publicNetworks;
  },
  getPublicNetworksTotalSize: function () {
    return _publicNetworksTotalSize;
  },
  getPublicIPs: function () {
    return _publicIPs;
  },
  getPublicIPsTotalSize: function () {
    return _publicIPsTotalSize;
  },
  getVDCID: function () {
    return _vdcID;
  },
  getDCID: function () {
    return _dcID;
  },
  getIPs: function () {
    return _privateIPs;
  },
  getPrivateIPs: function () {
    return _privateIPs;
  },
  getPrivateIPsTotalSize: function () {
    return _privateIPsTotalSize;
  },
  getNetInfo: function () {
    return _netInfo;
  },
  triggerVDCIDUpdate: function (id) {
    _vdcID = id;
    this.emit(UPDATE_VDCID);
  },
  triggerDCIDUpdate: function (id) {
    _dcID = id;
    this.emit(UPDATE_DCID);
  },
  triggerNetInfoUpdate: function (netInfo) {
    _netInfo = netInfo;
    this.emit(UPDATE_NETINFO);
  },
  addChangedListener(callback){
    this.on(GET_ALLVDC_SUCCESS, callback);
  },
  addNetworkPrivateListener(callback){
    this.on(GET_ALL_NETWORK_PRIVATE_SUCCESS, callback);
  },
  addNetworkPrivateIPSListener(callback){
    console.log(callback);
    this.on(GET_ALL_NETWORK_PRIVATE_IPS_SUCCESS, callback);
  },
  addNetworkExternalListener(callback){
    this.on(GET_ALL_NETWORK_EXTERNAL_SUCCESS, callback);
  },
  addNetworkExternalIPsListener(callback){
    this.on(GET_ALL_NETWORK_EXTERNAL_IPS_SUCCESS, callback);
  },
  addNetworkPublicListener(callback){
    this.on(GET_ALL_NETWORK_PUBLIC_SUCCESS, callback);
  },
  addNetworkPublicIPsListener(callback){
    this.on(GET_ALL_NETWORK_PUBLIC_IPS_SUCCESS, callback);
  },
  addUpdateDCIDListener(callback){
    this.on(UPDATE_DCID, callback);
  },
  addUpdateVDCIDListener(callback){
    this.on(UPDATE_VDCID, callback);
  },
  addUpdateNetInfoListener(callback){
    this.on(UPDATE_NETINFO, callback);
  },
  removeChangedListener(callback){
    this.removeListener(GET_ALLVDC_SUCCESS, callback);
  },
  removeNetworkPrivateListener(callback){
    this.removeListener(GET_ALL_NETWORK_PRIVATE_SUCCESS, callback);
  },
  removeNetworkPrivateIPSListener(callback){
    this.removeListener(GET_ALL_NETWORK_PRIVATE_IPS_SUCCESS, callback);
  },
  removeNetworkExternalListener(callback){
    this.removeListener(GET_ALL_NETWORK_EXTERNAL_SUCCESS, callback);
  },
  removeNetworkExternalIPsListener(callback){
    this.removeListener(GET_ALL_NETWORK_EXTERNAL_IPS_SUCCESS, callback);
  },
  removeNetworkPublicListener(callback){
    this.removeListener(GET_ALL_NETWORK_PUBLIC_SUCCESS, callback);
  },
  removeNetworkPublicIPsListener(callback){
    this.removeListener(GET_ALL_NETWORK_PUBLIC_IPS_SUCCESS, callback);
  },
  removeUpdateVDCIDListener(callback){
    this.removeListener(UPDATE_VDCID, callback);
  },
  removeUpdateDCIDListener(callback){
    this.removeListener(UPDATE_DCID, callback);
  },
  removeUpdateNetInfoListener(callback){
    this.removeListener(UPDATE_NETINFO, callback);
  }
});

networkDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_NETWORK_PRIVATE:
      networkStore.fetchPrivateNetworks(action);
      break;
    case ActionTypes.GET_NETWORK_PRIVATE:
      networkStore.fetchPrivateNetworks(action.payload);
      break;
    case ActionTypes.GET_PRIVATE_NETWORK_IP:
      networkStore.fetchPrivateIPs(action.payload);
      break;
    case ActionTypes.GET_NETWORK_EXTERNAL:
      networkStore.fetchExternalNetworks(action.payload);
      break;
    case ActionTypes.GET_EXTERNAL_IPS:
      networkStore.fetchExternalIPs(action.payload);
      break;
    case ActionTypes.GET_NETWORK_PUBLIC:
      networkStore.fetchPublicNetworks(action.payload);
      break;
    case ActionTypes.GET_PUBLIC_IPS:
      networkStore.fetchPublicIPs(action.payload);
      break;
    case ActionTypes.UPDATE_DCID:
      networkStore.triggerDCIDUpdate(action.dcID);
      break;
    case ActionTypes.UPDATE_NETINFO:
      networkStore.triggerNetInfoUpdate(action.netInfo);
      break;
    default:
      break;
  }
});

module.exports = networkStore;
