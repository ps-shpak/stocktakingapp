import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator_impl.dart';
import 'package:stocktakingmobile/state/scanning_page_state.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';

class AuthPageNavigatorImpl extends AuthPageNavigator {
  AuthPageNavigatorImpl({authManager: AuthenticationManager})
      : assert(authManager != null),
        _authenticationManager = authManager,
        super();

  AuthenticationManager _authenticationManager;

  @override
  void openScanning(BuildContext context) {
    final route = new MaterialPageRoute(
      builder: (context) => ScanningPage(
            initialState: ScanningPageState(
              navigator: ScanningPageNavigatorImpl(
                authManager: _authenticationManager,
              ),
              service: ScanningPageServiceImpl(),
            ),
          ),
    );
    Navigator.pushReplacement(context, route);
  }
}
