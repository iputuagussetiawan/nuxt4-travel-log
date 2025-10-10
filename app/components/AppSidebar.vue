<script setup lang="ts">
import {
    BookOpen,
    Bot,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    MapIcon
} from 'lucide-vue-next'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    type SidebarProps
} from './ui/sidebar'
import NavMain from './NavMain.vue'
import NavUser from './NavUser.vue'
import NavLogo from './NavLogo.vue'

const props = withDefaults(defineProps<SidebarProps>(), {
    collapsible: 'icon'
})

const authStore = useAuthStore()

const userData = {
    name: authStore?.user?.name,
    email: authStore?.user?.email,
    avatar: authStore?.user?.image
}

// This is sample data.
const data = {
    userData,
    teams: {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise'
    },
    navMain: [
        {
            title: 'Travel Location',
            url: '#',
            icon: MapIcon,
            isActive: true,
            items: [
                {
                    title: 'All Location',
                    url: '/dashboard/location'
                },
                {
                    title: 'Add Location',
                    url: '#'
                }
            ]
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Genesis',
                    url: '#'
                },
                {
                    title: 'Explorer',
                    url: '#'
                },
                {
                    title: 'Quantum',
                    url: '#'
                }
            ]
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introduction',
                    url: '#'
                },
                {
                    title: 'Get Started',
                    url: '#'
                },
                {
                    title: 'Tutorials',
                    url: '#'
                },
                {
                    title: 'Changelog',
                    url: '#'
                }
            ]
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#'
                },
                {
                    title: 'Team',
                    url: '#'
                },
                {
                    title: 'Billing',
                    url: '#'
                },
                {
                    title: 'Limits',
                    url: '#'
                }
            ]
        }
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: Frame
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: PieChart
        },
        {
            name: 'Travel',
            url: '#',
            icon: Map
        }
    ]
}
</script>

<template>
    <Sidebar v-bind="props">
        <SidebarHeader>
            <NavLogo :teams="data.teams" />
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="data.navMain" />
        </SidebarContent>
        <SidebarFooter>
            <NavUser :user="data.userData" />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
</template>
