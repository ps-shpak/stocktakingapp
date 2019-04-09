import 'package:flutter/material.dart';
import 'package:flutter_auth_buttons/flutter_auth_buttons.dart';
import 'package:flutter_svg/svg.dart';
import 'package:stocktakingmobile/domain/model/sign_in_result.dart';
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

    _service.isUserSignedIn().then((isAuthenticated) {
      if (isAuthenticated) {
        _navigator.openScanning(_context);
      } else {
        _state = _AuthState.Idle;
        setState(() {});
      }
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
      default:
        return _buildIdleBody();
    }
  }

  Widget _buildWaitSyncBody() {
    return Center(
      child: CircularProgressIndicator(),
    );
  }

  Widget _buildWaitSignInBody() {
    return Center(
      child: Text(_state.toString()),
    );
  }

  Widget _buildIdleBody() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: <Widget>[
        _buildAppIcon(),
        GoogleSignInButton(
          onPressed: _handleSignIn,
          darkMode: true,
        )
      ],
    );
  }

  Widget _buildAppIcon() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        SvgPicture.asset(
          "assets/ic_main.svg",
          width: 132,
          height: 132,
        ),
        _buildTitle(),
      ],
    );
  }

  Widget _buildTitle() {
    return Padding(
      padding: EdgeInsets.only(top: 18),
      child: Text(
        "Stocktacking app",
        style: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.normal,
        ),
      ),
    );
  }

  void _handleSignIn() {
    _service.signIn().then((result) {
      switch (result) {
        case SignInResult.Success:
          _navigator.openScanning(_context);
          break;
        case SignInResult.Canceled:
          break;
        case SignInResult.Error:
          _showError();
          break;
      }
    }).whenComplete(() {
      setState(() {
        _state = _AuthState.Idle;
      });
    }).catchError((error) {
      _navigator.openScanning(_context);
    });
  }

  void _showError() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: new Text("Ошибка авторизации"),
          content: new Text(
              "Во время авторизации произошла ошибка. Попробуйте войти позже..."),
          actions: <Widget>[
            new FlatButton(
              child: new Text("Закрыть"),
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
