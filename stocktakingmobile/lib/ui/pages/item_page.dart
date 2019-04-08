import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/state/item_page_state.dart';

class ItemPage extends StatefulWidget {
  ItemPage({initialState: ItemPageState})
      : _state = initialState,
        super();

  final ItemPageState _state;

  @override
  ItemPageState createState() => _state;
}
