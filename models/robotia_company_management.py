from odoo import api, fields, models,_
from odoo.exceptions import ValidationError


class RobotiaCompanyManagement(models.Model):
    _name = 'robotia.company.management'
    _description = 'Robotia Company Management'

    name = fields.Char(string='Tên công ty')
    company_phone = fields.Char(string='Số điện thoại')
    company_address = fields.Char(string='Địa chỉ')
    company_tax_code = fields.Char(string='Mã số thuế')
    company_charter_capital = fields.Char(string='Vốn điều lệ')
    state = fields.Selection([
        ('view', 'Xem'),
        ('edit', 'Chỉnh sửa'),
    ], string='Trạng thái', default='view')

    @api.constrains('company_phone')
    def _check_phone(self):
        for record in self:
            if record.company_phone and not record.company_phone.isdigit():
                raise ValidationError(_("Phone number should contain only digits."))

    @api.constrains('tax_id')
    def _check_tax_id(self):
        for record in self:
            if record.company_tax_code and not record.company_tax_code.isdigit():
                raise ValidationError(_("Tax ID should contain only digits."))

    @api.constrains('capital')
    def _check_capital(self):
        for record in self:
            if record.company_charter_capital and record.company_charter_capital < 0:
                raise ValidationError(_("Capital cannot be negative."))


