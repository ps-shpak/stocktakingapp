import 'package:flutter/material.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/state/settings_page_state.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class ScanningPageNavigatorImpl implements ScanningPageNavigator {
  @override
  openSettings(BuildContext context) {
    final route = new MaterialPageRoute(
      builder: (context) => SettingsPage(
            initialState: SettingsPageState(),
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
