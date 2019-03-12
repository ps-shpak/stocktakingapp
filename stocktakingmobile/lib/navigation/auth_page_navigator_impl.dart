import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator_impl.dart';
import 'package:stocktakingmobile/state/scanning_page_state.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';

class AuthPageNavigatorImpl extends AuthPageNavigator {
  @override
  void openScanning(BuildContext context) {
    final route = new MaterialPageRoute(
      builder: (context) => ScanningPage(
            initialState: ScanningPageState(
              navigator: ScanningPageNavigatorImpl(),
              service: ScanningPageServiceImpl(),
            ),
          ),
    );
    Navigator.pushReplacement(context, route);
  }
}
