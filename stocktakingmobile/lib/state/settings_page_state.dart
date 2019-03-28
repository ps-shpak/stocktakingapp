import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/model/user.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service.dart';
import 'package:stocktakingmobile/navigation/settings_page_navigator.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class SettingsPageState extends State<SettingsPage> {
  SettingsPageState(
    {service: SettingsPageService, navigator: SettingsPageNavigator})
    : assert(service != null),
      assert(navigator != null),
      _settingsPageService = service,
      _navigator = navigator,
      super();

  SettingsPageService _settingsPageService;
  SettingsPageNavigator _navigator;
  User _user = User(name: "Username", email: "");

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ConstrainedBox(
        constraints: const BoxConstraints.expand(),
        child: _buildBody(),
      ),
    );
  }

  Widget _buildBody() {
    return ListView(
      children: <Widget>[
        _buildUserProfile(),
        _buildServerUrlInput(),
        _buildLogoutButton(),
      ],
    );
  }

  Widget _buildUserProfile() {
    return Container(
      child: Column(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Center(
            child: Padding(
              padding: EdgeInsets.only(top: 10),
              child: Text("Ivan Andreyshev"),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServerUrlInput() {
    return TextField(
      decoration: InputDecoration(border: null, hintText: "Server url"),
    );
  }

  Widget _buildLogoutButton() {
    return FlatButton(
      child: Text(
        "Sign out",
        textAlign: TextAlign.start,
        style: TextStyle(
          color: Colors.red,
        ),
      ),
      onPressed: () {
        _settingsPageService.signOut().then((isSignedOut) {
          if (isSignedOut) _navigator.openAuthenticationPage(context);
        });
      },
    );
  }
}
