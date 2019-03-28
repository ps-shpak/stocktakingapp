import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator_impl.dart';
import 'package:stocktakingmobile/navigation/settings_page_navigator.dart';
import 'package:stocktakingmobile/state/auth_page_state.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';

class SettingsPageNavigatorImpl implements SettingsPageNavigator {
  SettingsPageNavigatorImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  AuthenticationManager _authenticationManager;

  @override
  void openAuthenticationPage(BuildContext context) {
    while (Navigator.canPop(context)) {
      Navigator.pop(context);
    }

    Navigator.pushReplacement(
      context,
      new MaterialPageRoute(
        builder: (context) => AuthPage(
              initialState: AuthPageState(
                navigator: AuthPageNavigatorImpl(
                  authManager: _authenticationManager,
                ),
                service: AuthPageServiceImpl(
                  authManager: _authenticationManager,
                ),
              ),
            ),
      ),
    );
  }
}
