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
  User _user = User(name: "Username", email: "username@email.com");

  @override
  void initState() {
    _user = _settingsPageService.getUser();
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
        _buildToolbar(),
        _buildUserProfile(),
        _buildServerUrlInput(),
        _buildLogoutButton(),
      ],
    );
  }

  Widget _buildToolbar() {
    return Container(
      margin: const EdgeInsets.only(top: 10.0, left: 14.0),
      child: Align(
        alignment: Alignment.topLeft,
        child: IconButton(
          icon: Icon(
            Icons.arrow_back,
            color: Colors.black54,
          ),
          onPressed: () {
            _navigator.back(context);
          },
        ),
      ),
    );
  }

  Widget _buildUserProfile() {
    return Container(
      child: Column(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(left: 14, top: 10),
            child: Text(
              _user.name,
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: 14, top: 10),
            child: Text(
              _user.email,
              style: TextStyle(fontSize: 18),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServerUrlInput() {
    return Padding(
      padding: EdgeInsets.only(top: 16, left: 14, right: 14, bottom: 16,),
      child: TextField(
        decoration: InputDecoration(border: null, hintText: "Server url"),
      ),
    );
  }

  Widget _buildLogoutButton() {
    return FlatButton(
      child: Padding(
        padding: EdgeInsets.only(top: 16),
        child: Text(
          "Выйти",
          textAlign: TextAlign.start,
          style: TextStyle(
            color: Colors.red,
          ),
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
