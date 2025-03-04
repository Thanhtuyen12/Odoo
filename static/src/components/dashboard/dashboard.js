/** @odoo-module */

import { Component, useState, onMounted } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

class RobotiaDashboardItem extends Component {
    static template = "robotia_company_management.DashboardItem";
    static props = {
        module: Object,
        onModuleClick: Function,
    };

    onClick() {
        this.props.onModuleClick();
    }
}

export class RobotiaDashboard extends Component {
    static template = "robotia_company_management.Dashboard";
    static components = { RobotiaDashboardItem };

    setup() {
        this.state = useState({
            companies: [],
            modules: [],
            loading: true,
            totalCompanies: 0,
            totalCapital: 0,
        });

        this.orm = useService("orm");
        this.actionService = useService("action");

        onMounted(() => this.loadData());
    }

    async loadData() {
        try {
            const companies = await this.orm.searchRead(
                "robotia.company.management",
                [],
                ["name", "company_phone", "company_address", "company_tax_code", "company_charter_capital"]
            );

            const totalCompanies = companies.length;
            const totalCapital = companies.reduce((sum, company) => sum + (parseFloat(company.company_charter_capital) || 0), 0);

            const modules = [
                { id: 1, name: "Tài liệu", icon: "/robotia_company_management/static/description/module1.png" },
                { id: 2, name: "Thiết bị", icon: "/robotia_company_management/static/description/module2.png" },
                { id: 3, name: "Nhân sự", icon: "/robotia_company_management/static/description/users_icon.png" },
                { id: 4, name: "Ví", icon: "/robotia_company_management/static/description/wallet_icon.png" },
                { id: 5, name: "Bảo mật", icon: "/robotia_company_management/static/description/module5.png" },
                { id: 6, name: "Server", icon: "/robotia_company_management/static/description/module6.png" },
                { id: 7, name: "Phương tiện", icon: "/robotia_company_management/static/description/video_icon.png" },
                { id: 8, name: "Hợp đồng", icon: "/robotia_company_management/static/description/module8.png" },
            ];

            this.state.companies = companies;
            this.state.modules = modules;
            this.state.totalCompanies = totalCompanies;
            this.state.totalCapital = totalCapital;
            this.state.loading = false;
        } catch (error) {
            console.error("Error loading dashboard data:", error);
            this.state.loading = false;
        }
    }

    onModuleClick() {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "robotia.company.management",
            view_mode: "list",
            views: [
                [false, "list"],
                [false, "form"],
            ],
            target: "current",
        });
    }

    refreshCompanies() {
    this.state.loading = true;
    this.loadData();
    }

    onAddCompany() {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "robotia.company.management",
            view_mode: "form",
            views: [[false, "form"]],
            target: "new",
        });
    }
    deleteCompany(companyId) {
    console.log("Xóa công ty:", companyId);
    this.state.companies = this.state.companies.filter(c => c.id !== companyId);
    }

    viewCompanyDetails(companyId) {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "robotia.company.management",
            view_mode: "form",
            res_id: companyId,
            views: [[false, "form"]],
            target: "current",
        });
    }

    editCompany(companyId) {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "robotia.company.management",
            view_mode: "form",
            res_id: companyId,
            views: [[false, "form"]],
            target: "current",
        });
    }
}

registry.category("actions").add("robotia_dashboard", RobotiaDashboard);