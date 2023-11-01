import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {
  

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> LottieAnimationView {
    
    let animationView = LottieAnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor(red: 63.0/255, green: 81.0/255, blue: 181.0/255, alpha: 1.0)
    return animationView;
  }

  @objc func play(animationView: LottieAnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
