const SideBarIcon = () => <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
</svg>

const DatasourcesIcon = () => <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6c0 1.7-3.1 3-7 3S5 7.7 5 6m14 0c0-1.7-3.1-3-7-3S5 4.3 5 6m14 0v6M5 6v6m0 0c0 1.7 3.1 3 7 3s7-1.3 7-3M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>
</svg>

const ClearIcon = () => <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
</svg>

interface HeadBarProps {
    title: string;
    onClearConversation: any;
    child: any;
}

const HeadBar: React.FC<HeadBarProps> = ({title, onClearConversation, child}) => {
    return (
        <div className="flex px-1 items-center bg-gray-100 w-full p-1">
            <div className="flex-1 text-left pl-4 truncate">
                {title}
            </div>
            {child}
        </div>
    )
}

export default HeadBar;
  