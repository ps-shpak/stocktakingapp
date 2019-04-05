import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/storage_manager.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/navigation/settings_page_navigator_impl.dart';
import 'package:stocktakingmobile/state/settings_page_state.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class ScanningPageNavigatorImpl implements ScanningPageNavigator {
  ScanningPageNavigatorImpl(
      {authManager: AuthenticationManager, storageManage: StorageManager})
      : assert(authManager != null),
        assert(storageManage != null),
        _authenticationManager = authManager,
        _storageManager = storageManage,
        super();

  AuthenticationManager _authenticationManager;
  StorageManager _storageManager;

  @override
  openSettings(BuildContext context) {
    Navigator.push(
      context,
      new MaterialPageRoute(
        builder: (context) => SettingsPage(
              initialState: SettingsPageState(
                service: SettingsPageServiceImpl(
                  authManager: _authenticationManager,
                  storageManager: _storageManager,
                ),
                navigator: SettingsPageNavigatorImpl(
                  authManager: _authenticationManager,
                  storageManager: _storageManager,
                ),
              ),
            ),
      ),
    );
  }

  @override
  Future<String> openScan() {
    // TODO: implement openScan
    return null;
  }
}
