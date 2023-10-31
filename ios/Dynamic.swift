import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {
  

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> AnimationView {
    
    let animationView = AnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor(red: 63.0/255, green: 81.0/255, blue: 181.0/255, alpha: 1.0)
    return animationView;
  }

  @objc func play(animationView: AnimationView) {
    animationView.play(
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    );
  }
}
