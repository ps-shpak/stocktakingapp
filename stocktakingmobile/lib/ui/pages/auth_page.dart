import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/state/auth_page_state.dart';

class AuthPage extends StatefulWidget {
  AuthPage({initialState: AuthPageState})
      : _state = initialState,
        super();

  final AuthPageState _state;

  @override
  AuthPageState createState() => _state;
}
