import { Injectable, signal, computed } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private _isMobile = signal(false);
  private _isTablet = signal(false);
  private _isDesktop = signal(false);
  private _platform = signal<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Public readonly signals
  readonly isMobile = this._isMobile.asReadonly();
  readonly isTablet = this._isTablet.asReadonly();
  readonly isDesktop = this._isDesktop.asReadonly();
  readonly platform = this._platform.asReadonly();

  // Computed signals
  readonly isMobileOrTablet = computed(() => this._isMobile() || this._isTablet());
  readonly showMobileUI = computed(() => this._isMobile());

  constructor(private ionicPlatform: Platform) {
    this.detectPlatform();
    this.setupResizeListener();
  }

  private detectPlatform(): void {
    const width = window.innerWidth;
    const isCordova = this.ionicPlatform.is('cordova');
    const isCapacitor = this.ionicPlatform.is('capacitor');
    const isIos = this.ionicPlatform.is('ios');
    const isAndroid = this.ionicPlatform.is('android');
    const isMobileDevice = this.ionicPlatform.is('mobile');
    const isTabletDevice = this.ionicPlatform.is('tablet');

    // Native mobile app
    if (isCordova || isCapacitor || isIos || isAndroid) {
      if (isTabletDevice || width >= 768) {
        this._isTablet.set(true);
        this._isMobile.set(false);
        this._isDesktop.set(false);
        this._platform.set('tablet');
      } else {
        this._isMobile.set(true);
        this._isTablet.set(false);
        this._isDesktop.set(false);
        this._platform.set('mobile');
      }
    }
    // Web browser - detect by screen width
    else if (isMobileDevice || width < 768) {
      this._isMobile.set(true);
      this._isTablet.set(false);
      this._isDesktop.set(false);
      this._platform.set('mobile');
    } else if (width >= 768 && width < 1024) {
      this._isTablet.set(true);
      this._isMobile.set(false);
      this._isDesktop.set(false);
      this._platform.set('tablet');
    } else {
      this._isDesktop.set(true);
      this._isMobile.set(false);
      this._isTablet.set(false);
      this._platform.set('desktop');
    }
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', () => {
      this.detectPlatform();
    });
  }

  /**
   * Check if running as a native app (Cordova/Capacitor)
   */
  isNativeApp(): boolean {
    return this.ionicPlatform.is('cordova') || this.ionicPlatform.is('capacitor');
  }

  /**
   * Check if running on iOS
   */
  isIos(): boolean {
    return this.ionicPlatform.is('ios');
  }

  /**
   * Check if running on Android
   */
  isAndroid(): boolean {
    return this.ionicPlatform.is('android');
  }

  /**
   * Get the current screen width
   */
  getScreenWidth(): number {
    return window.innerWidth;
  }

  /**
   * Get the current screen height
   */
  getScreenHeight(): number {
    return window.innerHeight;
  }
}
