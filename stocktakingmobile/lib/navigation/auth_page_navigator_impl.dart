import 'package:flutter/material.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';
import 'package:stocktakingmobile/state/scanning_page_state.dart';

class AuthPageNavigatorImpl extends AuthPageNavigator {
  @override
  void openScanning(BuildContext context) {
    final route = new MaterialPageRoute(
      builder: (context) => ScanningPage(
            initialState: ScanningPageState(),
          ),
    );
    Navigator.pushReplacement(context, route);
  }
}
