import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:stocktakingmobile/domain/model/qr_code_scan_result.dart';
import 'package:stocktakingmobile/domain/service/scanning_page_service.dart';
import 'package:stocktakingmobile/navigation/scanning_page_navigator.dart';
import 'package:stocktakingmobile/state/picker_body_state.dart';
import 'package:stocktakingmobile/ui/pages/scanning_page.dart';
import 'package:stocktakingmobile/ui/widget/picker_body.dart';

class ScanningPageState extends State<ScanningPage> {
  ScanningPageState(
      {navigator: ScanningPageNavigator, service: ScanningPageService})
      : assert(navigator != null),
        assert(service != null),
        _navigator = navigator,
        _service = service,
        super() {
    _pickerBodyState = ScanPickerBodyState(onStartScan: _startScan);
  }

  final ScanningPageService _service;
  final ScanningPageNavigator _navigator;

  ScanPickerBodyState _pickerBodyState;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: _buildAppBar(context),
      body: Container(
        child: Stack(
          children: <Widget>[
            ScanPickerBody(state: _pickerBodyState),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context) {
    return AppBar(
      elevation: 1,
      backgroundColor: Colors.white,
      centerTitle: true,
      title: Text(
        'Сканнер',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.black,
        ),
      ),
//      actions: <Widget>[
//        IconButton(
//          icon: Icon(
//            Icons.settings,
//            color: Colors.black54,
//          ),
//          onPressed: () {
//            _navigator.openSettings(context);
//          },
//        ),
//      ],
    );
  }

  _startScan() {
    _pickerBodyState.setState(() {
      _pickerBodyState.isScanning = true;
    });

    _service.scanCode().then((scanResult) {
      _handleScanResult(scanResult);
    }).whenComplete(() {
      _pickerBodyState.setState(() {
        _pickerBodyState.isScanning = false;
      });
    });
  }

  _handleScanResult(QRCodeScanResult result) {
    if (result.error != null) {
      _showScanItemError(result.error);
    } else if (result.item != null) {
      _navigator.openItem(context, result.item);
    } else {
      _showScanItemError(result.error);
    }
  }

  _showScanItemError(QRCodeScanError error) {
    switch (error) {
      case QRCodeScanError.UNKNOWN:
        _showUnknownError();
        break;
      case QRCodeScanError.BACK_PRESSED:
        // Nothing to do
        break;
      case QRCodeScanError.CAMERA_PERMISSIONS:
        _showPermissionsError();
        break;
      case QRCodeScanError.PARSING:
        _showParsingError();
        break;
    }
  }

  _showUnknownError() {
    _showError(
      'Неизвестная ошибка',
      'Во время сканирования произошла неизвестная ошибка. Попробуйте начать сканирование ещё раз.',
    );
  }

  _showPermissionsError() {
    _showError(
      'Ошибка доступа',
      'Приложению необходим доступ к камере, чтобы начать сканирование.',
    );
  }

  _showParsingError() {
    _showError(
      'Ошибка чтения QR-кода',
      'Сканирован неподдерживаемый формат QR-кода. Убедитесь, что вы сканируете верный QR-код.',
    );
  }

  _showConnectionError() {}

  _showError(String title, String description) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: new Text(title),
          content: new Text(description),
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
