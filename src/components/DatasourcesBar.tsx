import { DataSource, DataSourceType } from "../types";

interface DatasourcesBarProps {
    datasources: DataSource[]
    selectedDatasourceName: string;
    selectedDatasourceType: DataSourceType;
    onChangeDataSource: any;
}

const DatasourcesBar: React.FC<DatasourcesBarProps> = ({ datasources, selectedDatasourceName, onChangeDataSource }) => {
    const onSelectDatasource = (e: any) => {
        onChangeDataSource(e.target.value, 'summary');
    }

    return (
        <aside id="datasources-bar" className="fixed top-0 right-0 z-40 w-64 h-screen transition-transform translate-x-full sm:translate-x-0" aria-label="Sidebar2">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div>
                    <select id="countries" onChange={onSelectDatasource} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option></option>
                        {datasources.map((datasource: DataSource) => (
                            <option selected={datasource.name == selectedDatasourceName}>{datasource.name}</option>
                        ))}
                    </select>
                    <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="list-radio-license" onClick={() => onChangeDataSource(selectedDatasourceName, 'summary')} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Summary </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input id="list-radio-id" onClick={() => onChangeDataSource(selectedDatasourceName, 'full')} type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default DatasourcesBar;
