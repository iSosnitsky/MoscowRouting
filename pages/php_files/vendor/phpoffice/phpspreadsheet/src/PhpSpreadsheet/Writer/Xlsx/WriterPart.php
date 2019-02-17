<?php

namespace PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

abstract class WriterPart
{
    /**
     * Parent Xlsx obj.
     *
     * @var Xlsx
     */
    private $parentWriter;

    /**
     * Get parent Xlsx obj.
     *
     * @return Xlsx
     */
    public function getParentWriter()
    {
        return $this->parentWriter;
    }

    /**
     * Set parent Xlsx obj.
     *
     * @param Xlsx $pWriter
     */
    public function __construct(Xlsx $pWriter)
    {
        $this->parentWriter = $pWriter;
    }
}
