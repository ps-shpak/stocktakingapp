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
    return Center(
      child: Text('Settings'),
    );
  }
}
