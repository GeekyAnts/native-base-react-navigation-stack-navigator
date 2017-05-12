/* @flow */

import React from 'react';
import { requireNativeComponent } from 'react-native';
import { EmitterSubscription } from 'fbemitter';
import AdsManager from './NativeAdsManager';
import type { NativeAd } from './types';

const NativeAdView = requireNativeComponent('CTKNativeAd', null);

type NativeAdWrapperState = {
  ad: ?NativeAd,
  canRequestAds: boolean,
};

type NativeAdWrapperProps = {
  adsManager: AdsManager,
};

/**
 * Higher order function that wraps given `Component` and provides `nativeAd` as a prop
 *
 * In case of an empty ad or adsManager not yet ready for displaying ads, null will be
 * returned instead of a component provided.
 */
export default (Component: Function) => class NativeAdWrapper extends React.Component {
  state: NativeAdWrapperState = {
    ad: null,
    canRequestAds: false,
  };

  props: NativeAdWrapperProps;

  /** @{EmitterSubscription} **/
  subscription: EmitterSubscription;

  /**
   * On init, register for updates on `adsManager` to know when it becomes
   * available for accessing
   */
  componentDidMount() {
    this.subscription = this.props.adsManager.onAdsLoaded(
      () => this.setState({ canRequestAds: true })
    );
  }

  /**
   * Clear subscription when component goes off screen
   */
  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const { adsManager, ...props } = this.props;

    if (!this.state.canRequestAds) {
      return null;
    }

    return (
      <NativeAdView
        adsManager={adsManager.toJSON()}
        onAdLoaded={(e) => this.setState({ ad: e.nativeEvent })}>
        {this.state.ad && <Component nativeAd={this.state.ad} {...props} />}
      </NativeAdView>
    );
  }
};
