import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { meterStore } from './stores/MeterStore';
import { MeterRow } from './components/MeterRow';
import { MetersType } from './types';
import {
  H1,
  StyledContainer,
  StyledPagination,
  StyledTable,
  TableContainer,
} from './App.styles';
import { TableHeader } from './components/TableHeader';
import { generatePageNumbers } from './generatePageNumbers';

const LIMIT = 20;

const App = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    meterStore.fetchMeters(LIMIT, (currentPage - 1) * LIMIT);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(meterStore.totalCount / LIMIT);

  return (
    <StyledContainer className="App">
      <H1>Списовк счетчиков</H1>
      <TableContainer>
        <StyledTable>
          <TableHeader />
          <tbody>
            {meterStore.isLoading ? (
              <tr>
                <td>Идет загрузка, пожалуйста ожидайте...</td>
              </tr>
            ) : (
              meterStore.meters?.map((meter: MetersType, index) => {
                return (
                  <MeterRow
                    key={meter.id}
                    meter={meter}
                    index={index + 1 + (currentPage - 1) * LIMIT}
                  />
                );
              })
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
      <StyledPagination>
        {generatePageNumbers(totalPages, currentPage).map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ) : (
            <button
              key={index}
              onClick={() =>
                handlePageChange(
                  currentPage + (currentPage < totalPages / 2 ? 5 : -5)
                )
              }
            >
              {page}
            </button>
          )
        )}
      </StyledPagination>
    </StyledContainer>
  );
});

export default App;
