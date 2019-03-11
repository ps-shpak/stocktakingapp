import 'package:flutter/material.dart';
import 'package:rxdart/rxdart.dart';
import 'package:stocktakingmobile/domain/model/user.dart';
import 'package:stocktakingmobile/domain/service/auth_page_service.dart';
import 'package:stocktakingmobile/navigation/auth_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/auth_page.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthPageState extends State<AuthPage> {
  AuthPageState({navigator: AuthPageNavigator, service: AuthPageService})
      : assert(navigator != null),
        assert(service != null),
        _service = service,
        _navigator = navigator,
        super();

  final AuthPageService _service;
  final AuthPageNavigator _navigator;

  @override
  Widget build(BuildContext context) => _buildBody();

  Widget _buildBody() {
    return Center(
      child: Text(
        'Hello, world!!!!!',
        style: TextStyle(fontSize: 72, color: Colors.black),
      ),
    );
  }
}
