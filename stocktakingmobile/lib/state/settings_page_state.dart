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
    return ConstrainedBox(
      constraints: const BoxConstraints.expand(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          Center(
            child: Image.network(
                "http://sovitpoudel.com.np/wp-content/uploads/2019/01/flutter.png"),
          ),
          Center(
            child: Text("Ivan Andreyshev"),
          ),
        ],
      ),
    );
  }

  Widget _buildServerUrlInput() {
    return Card(
      child: Text("Url input"),
    );
  }

  Widget _buildLogoutButton() {
    return Card(
      child: IconButton(icon: Icon(Icons.arrow_back), onPressed: () {}),
    );
  }
}
