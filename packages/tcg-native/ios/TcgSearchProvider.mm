#import "TcgSearchProvider.h"

#include <memory>

#include "../shared/TcgSearchCxxModule.h"

@implementation TcgSearchProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::TcgSearchCxxModule>(params.jsInvoker);
}

@end
