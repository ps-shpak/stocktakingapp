import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/state/settings_page_state.dart';

class SettingsPage extends StatefulWidget {
  SettingsPage({initialState: SettingsPageState})
      : _state = initialState,
        super();

  SettingsPageState _state;

  @override
  State<StatefulWidget> createState() => _state;
}
