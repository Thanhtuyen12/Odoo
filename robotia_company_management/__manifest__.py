{
    'name': 'Robotia Company Management',
    'summary': 'Manage company information with a dashboard interface',
    'description': 'This module is for managing company information.',
    'author': 'Thanh Tuyen Phung',
    'category': 'Robotia/Robotia',
    'icon': '/robotia_company_management/static/description/module1.png',
    'version': '1.0',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/robotia_company_management_views.xml',
        'views/menu.xml',
        'data/robotia_company_management_data.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'robotia_company_management/static/src/**/*.js',
            'robotia_company_management/static/src/**/*.xml',
            "robotia_company_management/static/src/**/*.scss",
        ],
    },
    'application': True,
    'installable': True,
    'license': 'LGPL-3',
}
