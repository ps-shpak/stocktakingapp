import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart';
import 'package:stocktakingmobile/domain/model/user.dart';
import 'package:stocktakingmobile/domain/service/google_auth_page_service.dart';
import 'package:stocktakingmobile/navigation/flutter_auth_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';
import 'package:stocktakingmobile/ui/pages/auth_page_state.dart';
import 'package:stocktakingmobile/ui/theme/MaterialTheme.dart';

class StocktakingApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stocktaking',
      theme: materialTheme,
      home: Scaffold(
        body: AuthPage(
          initialState: AuthPageState(
            navigator: FlutterAuthPageNavigator(),
            service: GoogleAuthService(),
          ),
        ),
      ),
    );
  }
}
