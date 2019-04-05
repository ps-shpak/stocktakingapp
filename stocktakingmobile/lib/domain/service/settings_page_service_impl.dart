import 'dart:async';

import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/sign_out_result.dart';
import 'package:stocktakingmobile/domain/model/storage_manager.dart';
import 'package:stocktakingmobile/domain/model/user.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service.dart';

class SettingsPageServiceImpl implements SettingsPageService {
  SettingsPageServiceImpl(
      {authManager: AuthenticationManager, storageManager: StorageManager})
      : assert(authManager != null),
        assert(storageManager != null),
        _authenticationManager = authManager,
        _storageManager = storageManager,
        super();

  AuthenticationManager _authenticationManager;
  StorageManager _storageManager;
  Timer _updateServerUrlDebounce;

  @override
  User getUser() {
    return _authenticationManager.getUser();
  }

  @override
  Future<String> getServerUrl() async {
    return _storageManager.getServerUrl();
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

  @override
  saveServerUrl(String url) {
    if (_updateServerUrlDebounce?.isActive ?? false) {
      _updateServerUrlDebounce.cancel();
    }

    _updateServerUrlDebounce = Timer(const Duration(milliseconds: 500), () {
      _storageManager.saveServerUrl(url.trim());
    });
  }
}
