import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/state/settings_page_state.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class ScanningPageNavigatorImpl implements ScanningPageNavigator {
  ScanningPageNavigatorImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  AuthenticationManager _authenticationManager;

  @override
  openSettings(BuildContext context) {
    final route = new MaterialPageRoute(
      builder: (context) => SettingsPage(
            initialState: SettingsPageState(
              service: SettingsPageServiceImpl(
                authManager: _authenticationManager,
              ),
            ),
          ),
    );
    Navigator.push(context, route);
  }

  @override
  Future<String> openScan() {
    // TODO: implement openScan
    return null;
  }
}
