import 'package:flutter/material.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';

enum _AuthState { WaitSync, WaitSignIn, Idle }

class AuthPageState extends State<AuthPage> {
  AuthPageState({navigator: AuthPageNavigator, service: AuthPageService})
      : assert(navigator != null),
        assert(service != null),
        _service = service,
        _navigator = navigator,
        super();

  final AuthPageService _service;
  final AuthPageNavigator _navigator;

  BuildContext _context;
  _AuthState _state = _AuthState.WaitSync;

  @override
  void initState() {
    super.initState();

    _service.isUserAuthenticated().then((isAuthenticated) {
      if (isAuthenticated) {
        _navigator.openScanning(_context);
      }
    }).whenComplete(() {
      _state = _AuthState.Idle;
      setState(() {});
    }).catchError((error) {
      _showError();
    });
  }

  @override
  Widget build(BuildContext context) {
    _context = context;
    return Scaffold(
      body: ConstrainedBox(
        constraints: const BoxConstraints.expand(),
        child: _buildBody(),
      ),
    );
  }

  Widget _buildBody() {
    switch (_state) {
      case _AuthState.WaitSync:
        return _buildWaitSyncBody();
      case _AuthState.WaitSignIn:
        return _buildWaitSignInBody();
      case _AuthState.Idle:
        return _buildIdleBody();
    }
  }

  Widget _buildWaitSyncBody() {
    return Center(
      child: Text(_state.toString()),
    );
  }

  Widget _buildWaitSignInBody() {
    return Center(
      child: Text(_state.toString()),
    );
  }

  Widget _buildIdleBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: <Widget>[
        const Text("Authentication"),
        RaisedButton(
          child: const Text('SIGN IN'),
          onPressed: _handleSignIn,
        ),
      ],
    );
  }

  void _handleSignIn() {
    _service.signIn().then((isSignedIn) {
      if (isSignedIn) {
        _navigator.openScanning(_context);
      }
    }).whenComplete(() {
      _state = _AuthState.Idle;
      setState(() {});
    }).catchError((error) {
      _navigator.openScanning(_context);
    });
  }

  void _showError() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        // return object of type Dialog
        return AlertDialog(
          title: new Text("Sign in error"),
          content: new Text("Alert Dialog body"),
          actions: <Widget>[
            // usually buttons at the bottom of the dialog
            new FlatButton(
              child: new Text("Close"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
