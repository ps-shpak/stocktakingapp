import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service_impl.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator_impl.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';
import 'package:stocktakingmobile/state/auth_page_state.dart';
import 'package:stocktakingmobile/ui/theme/MaterialTheme.dart';

class StocktakingApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Stocktaking',
      theme: materialTheme,
      home: AuthPage(
        initialState: AuthPageState(
          navigator: AuthPageNavigatorImpl(),
          service: AuthServiceImpl(),
        ),
      ),
    );
  }
}
