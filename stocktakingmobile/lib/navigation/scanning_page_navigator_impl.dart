import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/qr_code_Item.dart';
import 'package:stocktakingmobile/domain/model/storage_manager.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/navigation/settings_page_navigator_impl.dart';
import 'package:stocktakingmobile/state/item_page_state.dart';
import 'package:stocktakingmobile/state/settings_page_state.dart';
import 'package:stocktakingmobile/ui/pages/item_page.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class ScanningPageNavigatorImpl implements ScanningPageNavigator {
  ScanningPageNavigatorImpl(
      {authManager: AuthenticationManager, storageManager: StorageManager})
      : assert(authManager != null),
        assert(storageManager != null),
        _authenticationManager = authManager,
        _storageManager = storageManager,
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
  openItem(BuildContext context, QRCodeItem item) {
    Navigator.push(
      context,
      new MaterialPageRoute(
        builder: (context) => ItemPage(
              initialState: ItemPageState(item),
            ),
      ),
    );
  }
}
