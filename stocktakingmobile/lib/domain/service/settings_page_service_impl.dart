import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/sign_out_result.dart';
import 'package:stocktakingmobile/domain/model/user.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service.dart';

class SettingsPageServiceImpl implements SettingsPageService {
  SettingsPageServiceImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  AuthenticationManager _authenticationManager;

  @override
  User getUser() {
    return _authenticationManager.getUser();
  }

  @override
  Future<bool> signOut() async {
    SignOutResult signOutResult = await _authenticationManager.signOut();

    if (signOutResult == SignOutResult.Success) {
      return true;
    } else {
      return false;
    }
  }
}
