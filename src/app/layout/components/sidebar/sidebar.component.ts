import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {PermissionsService} from "../../../shared/services/permissions.service";
import {IPermission} from "./permission";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';

    public HideCharts: boolean = true;
    public PermissionData: IPermission[];

    @Output() collapsedEvent = new EventEmitter<boolean>();


    constructor(private service: PermissionsService, private translate: TranslateService, public router: Router) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    public ngOnInit(): void {

        //console.log(localStorage.getItem('username'));

        this.service.getPermissions(localStorage.getItem('username'))
            .subscribe(res => {
                this.PermissionData = res;
                localStorage.setItem('permissions', JSON.stringify(this.PermissionData));
            });

        let item = JSON.parse(localStorage.getItem('permissions'));
        console.log(item);
        //   console.log(item.includes("Edit-Permission"));
        for (let i = 0; i < item.length; i++) {
            //console.log(item[i]['name']);
            if (item[i]['name'] == "Edit-Permission") {
                this.HideCharts = false;
            }
        }

    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

}
