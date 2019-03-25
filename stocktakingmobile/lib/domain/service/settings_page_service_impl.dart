import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service.dart';

class SettingsPageServiceImpl implements SettingsPageService {
  SettingsPageServiceImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  AuthenticationManager _authenticationManager;

  @override
  Future<String> getUserName() {
    return null;
  }

  @override
  Future<bool> signOut() {
    // TODO: implement signOut
    return null;
  }
}
