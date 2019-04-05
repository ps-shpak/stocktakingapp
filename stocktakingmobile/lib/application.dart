import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/model/authentication_manager.dart';
import 'package:stocktakingmobile/domain/model/storage_manager.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator_impl.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';
import 'package:stocktakingmobile/state/auth_page_state.dart';
import 'package:stocktakingmobile/ui/theme/MaterialTheme.dart';

class StocktakingApp extends StatelessWidget {
  AuthenticationManager _authenticationManager = AuthenticationManager();
  StorageManager _storageManager = StorageManager();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stocktaking',
      theme: materialTheme,
      home: AuthPage(
        initialState: AuthPageState(
          navigator: AuthPageNavigatorImpl(
            authManager: _authenticationManager,
            storageManager: _storageManager,
          ),
          service: AuthPageServiceImpl(
            authManager: _authenticationManager,
          ),
        ),
      ),
    );
  }
}
