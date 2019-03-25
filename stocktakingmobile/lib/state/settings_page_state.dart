import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/service/settings_page_service.dart';
import 'package:stocktakingmobile/ui/pages/settings_page.dart';

class SettingsPageState extends State<SettingsPage> {
  SettingsPageState({service: SettingsPageService}) : super();

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
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              image: DecorationImage(
                fit: BoxFit.fill,
                image: NetworkImage(
                    "https://cdn-images-1.medium.com/max/1600/1*D5afxg0H9xyxfqRq_bfTgQ.png"),
              ),
            ),
          ),
          Center(
            child: Text("Ivan Andreyshev"),
          ),
        ],
      ),
    );
  }

  Widget _buildServerUrlInput() {
    return TextField(
      decoration: InputDecoration(
        border: null,
        hintText: "Server url"
      ),
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
      onPressed: () {},
    );
  }
}
