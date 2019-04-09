import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';
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
  String _serverUrl = '';

  @override
  void initState() {
    _user = _settingsPageService.getUser();

    if (_user == null) {
      _navigator.openAuthenticationPage(context);
    }

    _settingsPageService.getServerUrl().then((url) {
      _serverUrl = url;
      setState(() {});
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
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
        _buildServerUrlInput(),
        _buildLogoutButton(),
      ],
    );
  }

  Widget _buildToolbar() {
    return Card(
      margin: EdgeInsets.only(),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            _buildUserProfile(),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar() {
    return AppBar(
      centerTitle: true,
      elevation: 1,
      backgroundColor: Colors.white,
      title: Text(
        'Настройки',
        style: TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.bold,
        ),
      ),
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back,
          color: Colors.black54,
        ),
        onPressed: () {
          _navigator.back(context);
        },
      ),
    );
  }

  Widget _buildUserProfile() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 20, horizontal: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Expanded(
            flex: 0,
            child: SvgPicture.asset(
              "assets/ic_account_user.svg",
              width: 52,
              height: 52,
            ),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Padding(
                  padding: EdgeInsets.only(left: 14),
                  child: Text(
                    _user.name,
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 14, top: 4),
                  child: Text(
                    _user.email,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black54,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServerUrlInput() {
    return Padding(
      padding: EdgeInsets.only(top: 2),
      child: Card(
        child: Padding(
          padding: EdgeInsets.only(top: 16, left: 14, right: 14, bottom: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'Сервер инвентаризации',
                textAlign: TextAlign.start,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
              TextField(
                controller: TextEditingController(text: _serverUrl),
                keyboardType: TextInputType.url,
                onChanged: (input) {
                  _serverUrl = input;
                  _settingsPageService.saveServerUrl(input);
                },
                decoration: InputDecoration(hintText: "Не указан"),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogoutButton() {
    return Card(
      color: Colors.white,
      child: FlatButton(
        child: Padding(
          padding: EdgeInsets.only(top: 16, bottom: 16),
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
      ),
    );
  }
}
